//Sample code for Hybrid REST Explorer

function regLinkClickHandlers() {
    var $j = jQuery.noConflict();
    var logToConsole = cordova.require("salesforce/util/logger").logToConsole;
    $j('#link_add_contact').click(function() {
                                            $j.mobile.changePage('#addContactPage',{changeHash: true});
                                           });
    $j('#returnToHome').click(function(){
                              $j.mobile.changePage('#app-home', {changeHash: true});
                              });
    $j('#link_test_user').click(function(){
                                var userName = $j('#inputUser').val();
                                var userEmail = $j('#inputEmail').val();
                                var userAlias = userName.substring(0,8);
                                forcetkClient.create("user",{"LastName": userName, "Alias": userAlias, "Email": userEmail, "Username": userEmail, "CommunityNickname": userName, "EmailEncodingKey": "ISO-8859-1", "TimeZoneSidKey": "America/New_York", "LocaleSidKey": "en_US", "ProfileId": "00eG00000016MBF", "LanguageLocaleKey": "en_US"}, function(result){
                                            onSuccessUser(result["id"], userName)
                                                          }, onErrorSfdc);
                                });
}

function onSuccessDevice(contacts) {
    var $j = jQuery.noConflict();
    cordova.require("salesforce/util/logger").logToConsole("onSuccessDevice: received " + contacts.length + " contacts");
    $j("#div_device_contact_list").html("")
    var ul = $j('<ul data-role="listview" data-inset="true" data-theme="a" data-dividertheme="a"></ul>');
    $j("#div_device_contact_list").append(ul);
    
    ul.append($j('<li data-role="list-divider">Device Contacts: ' + contacts.length + '</li>'));
    $j.each(contacts, function(i, contact) {
           var formattedName = contact.name.formatted;
           if (formattedName) {
           var newLi = $j("<li><a href='#'>" + (i+1) + " - " + formattedName + "</a></li>");
           ul.append(newLi);
           }
           });
    
    $j("#div_device_contact_list").trigger( "create" )
}

function onSuccessUser(user, userName)
{
    forcetkClient.create("tdev__Trainee_Summary_Record__c", {"Name": userName, "tdev__User__c": user["id"]}, function(){alert("User Created Successfully");}, onErrorSfdc);
}

function onErrorDevice(error) {
    cordova.require("salesforce/util/logger").logToConsole("onErrorDevice: " + JSON.stringify(error) );
    alert('Error getting device contacts!');
}


function onErrorSfdc(error) {
    cordova.require("salesforce/util/logger").logToConsole("onErrorSfdc: " + JSON.stringify(error));
    alert(JSON.stringify(error));
}

// OLD CODE

/*
function onSuccessSfdcContacts(response) {
    var $j = jQuery.noConflict();
    cordova.require("salesforce/util/logger").logToConsole("onSuccessSfdcContacts: received " + response.totalSize + " contacts");
    
    $j("#div_sfdc_contact_list").html("")
    var ul = $j('<ul data-role="listview" data-inset="true" data-theme="a" data-dividertheme="a"></ul>');
    $j("#div_sfdc_contact_list").append(ul);
    
    ul.append($j('<li data-role="list-divider">Salesforce Contacts: ' + response.totalSize + '</li>'));
    $j.each(response.records, function(i, contact) {
            var newLi = $j("<li><a href='#'>" + (i+1) + " - " + contact.Name + "</a></li>");
            ul.append(newLi);
            });
    
    $j("#div_sfdc_contact_list").trigger( "create" )
}

function onSuccessSfdcAccounts(response) {
    var $j = jQuery.noConflict();
    cordova.require("salesforce/util/logger").logToConsole("onSuccessSfdcAccounts: received " + response.totalSize + " accounts");
    
    $j("#div_sfdc_account_list").html("")
    var ul = $j('<ul data-role="listview" data-inset="true" data-theme="a" data-dividertheme="a"></ul>');
    $j("#div_sfdc_account_list").append(ul);
    
    ul.append($j('<li data-role="list-divider">Salesforce Accounts: ' + response.totalSize + '</li>'));
    $j.each(response.records, function(i, record) {
            var newLi = $j("<li><a href='#'>" + (i+1) + " - " + record.Name + "</a></li>");
            ul.append(newLi);
            });
    
    $j("#div_sfdc_account_list").trigger( "create" )
}
 
 */
