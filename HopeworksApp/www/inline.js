//Sample code for Hybrid REST Explorer

function regLinkClickHandlers() {
    var $j = jQuery.noConflict();
    var logToConsole = cordova.require("salesforce/util/logger").logToConsole;
    $j('#link_add_contact').click(function() {
                                  $j.mobile.changePage('#addContactPage',{});
                                           });
    $j('#link_list_trainee').click(function(){
                                   forcetkClient.query("SELECT Name FROM tdev__Trainee_Summary_Record__c", onSuccessTrainees, onErrorSfdc);
                                   
                                   });
    $j('.returnToHome').click(function(){
                              $j.mobile.changePage('#app-home', {});
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

function onSuccessTrainees(response) {
    var $j = jQuery.noConflict();
    $j.mobile.changePage('#listTrainee',{});
    $j("#traineelist").html("")
    var ul = $j('<ul data-role="listview" data-inset="true" data-theme="a" data-dividertheme="a"></ul>');
    $j("#traineelist").append(ul);
    
    ul.append($j('<li data-role="list-divider">Trainees: ' + response.totalSize + '</li>'));
    $j.each(response.records, function(i, trainee) {
           var newLi = $j("<li><a href='#'>" + (i+1) + " - " + trainee.Name + "</a></li>");
           ul.append(newLi);
           });
    
    $j("#traineelist").trigger( "create" )
}

function onSuccessUser(user, userName)
{
    forcetkClient.create("tdev__Trainee_Summary_Record__c", {"Name": userName, "tdev__User__c": user}, function(){alert("User " + user + " Created Successfully");}, onErrorSfdc);
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
