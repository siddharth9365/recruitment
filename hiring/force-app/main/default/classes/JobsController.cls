public without sharing class JobsController {
    public JobsController() {

    }

    @AuraEnabled
    public static List<Position__c> getJobList() {
        return [
            SELECT Id, Name,Employment_Type__c,Hiring_Manager__r.Name,Job_Description__c,Location__c,Max_Pay__c,Min_Pay__c,Responsibilities__c,Skills_Required__c,Type__c,Status__c
            FROM Position__c
            LIMIT 10
        ];
    }

    @AuraEnabled
    public static Position__c getJob(String recordId) {
        try {
            return [
                SELECT Id, Name,Employment_Type__c,Hiring_Manager__r.Name,Job_Description__c,Location__c,Max_Pay__c,Min_Pay__c,Responsibilities__c,Skills_Required__c,Type__c,Status__c
                FROM Position__c WHERE Id = :recordId
                LIMIT 1
            ];   
        } catch (Exception e) {
            
        }

        return null;
    }

    @AuraEnabled 
    public static Boolean fetchUserType(String recordId) {
        if(Auth.CommunitiesUtil.isGuestUser()){
            return false;
        }else{

            return true;
        }
    }

    @AuraEnabled 
    public static User fetchUser() {
        if(Auth.CommunitiesUtil.isGuestUser()){
            return null;
        }else{
            return [SELECT Id,ContactId FROM User WHERE Id = :UserInfo.getUserId()];
        }
    }


}
