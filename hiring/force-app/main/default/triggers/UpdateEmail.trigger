trigger UpdateEmail on Interview__c (before insert) {
	InterviewTriggerHandler handler = new InterviewTriggerHandler();
    if(Trigger.isBefore && Trigger.isInsert){
        handler.beforeInsert(Trigger.New);
    }
}