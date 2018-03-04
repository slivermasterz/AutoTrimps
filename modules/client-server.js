var ATServer = 
{
	//SERVER_IP: '207.246.77.188',
    SERVER_HOSTNAME: 'autotrimps.site'
}

ATServer.GetID = function(callback)
{
	var req = new XMLHttpRequest();

	req.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			callback(JSON.parse(req.responseText).data.id);
		}
	}

	req.open('GET', 'https://' + ATServer.SERVER_HOSTNAME, true);
	req.setRequestHeader('req', 'get_id');
	req.send();
}

ATServer.SaveData = function(id, data, callback)
{
	var req = new XMLHttpRequest();

	req.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			callback(JSON.parse(req.responseText));
		}
	}

	req.open('POST', 'https://' + ATServer.SERVER_HOSTNAME + '?id=' + id, true);
	req.setRequestHeader('req', 'save_data');
	req.setRequestHeader("Content-Type", "application/json");
	req.send(JSON.stringify(data));
}

ATServer.Upload = function(data)
{
    ATServer.GetID(function(id) 
    { 
        ATServer.SaveData(id, data, function(response) 
        { 
            console.log(response);
        });
    });
}

//Data to be uploaded: The version of AutoTrimps and the list of your settings file.
// note to newbs: typing in autoTrimpSettings into console and expanding the arrow will show you what is all in here.
var ulData = {
    version: autoTrimpSettings.ATversion,
    settings: autoTrimpSettings
}

ATServer.UploadSettings = function() {
    ATServer.Upload(ulData);
    console.log("AutoTrimps Settings File was Uploaded for analytics/usage! This is controlled with a new button on AT's Import/Export tab.");
}
if (autoTrimpSettings.allowSettingsUpload) {
    ATServer.UploadSettings();
}