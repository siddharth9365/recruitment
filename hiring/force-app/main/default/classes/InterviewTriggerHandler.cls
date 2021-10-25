public class InterviewTriggerHandler {
    public void beforeInsert(List<Interview__c> interviews){
        Map<Id,List<Interview__c>> jobMap = new Map<Id,List<Interview__c>>();
        for(Interview__c interview : interviews){
            if(!jobMap.containsKey(interview.Application__c)){
                jobMap.put(interview.Application__c,new List<Interview__c>());
            }
            jobMap.get(interview.Application__c).add(interview);
        }
        List<Application__c> applications = [SELECT Id,Candidate__r.Email FROM Application__c WHERE Id IN :jobMap.keyset()];
        
        for(Application__c application : applications){
            for(Interview__c interview : jobMap.get(application.Id)){
                interview.Contact_Email__c = application.Candidate__r.Email;
            }
        }
    }
}