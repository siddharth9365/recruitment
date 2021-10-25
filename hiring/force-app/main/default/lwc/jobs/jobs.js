import { LightningElement,wire,api, track } from 'lwc';
import getJobList from '@salesforce/apex/JobsController.getJobList';

export default class Jobs extends LightningElement {
    jobs;
    error;
    @wire(getJobList) 
    wiredJobs({ error, data }) {
        if (data) {
            console.log(data);
            this.jobs = data;
            this.jobs = this.jobs.map(job => {
                return {
                     ...job,
                     link: "/s/job-details?id="+job.Id
                }
            })
            this.error = undefined;
        } else if (error) {
            console.log(error);
            this.error = error;
            this.jobs = undefined;
        }
    };

    
    

    
    @api buttonText;
}