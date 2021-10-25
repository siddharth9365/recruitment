import { LightningElement,api,wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getJob from '@salesforce/apex/JobsController.getJob';
import fetchUserType from '@salesforce/apex/JobsController.fetchUserType';


export default class Jobdetails extends LightningElement {
    @api positionId;
    job;
    error;
    isLoggedIn;
    contactId;
    isModalOpen = false;

    @wire(CurrentPageReference)
    currentPageReference;

    connectedCallback() {
        console.log( 'Param ' + this.currentPageReference.state.id );
        this.positionId = this.currentPageReference.state.id;
        getJob({recordId: this.positionId})
        .then(result =>{
            this.job = result;
            console.log(result);
            this.error = undefined;
        })
        .catch(error =>{
            this.error = error;
            console.log('dd'+error);
            this.job = undefined;
        });

        fetchUserType({recordId: this.positionId})
        .then(result =>{
            this.isLoggedIn = result;
            console.log(result);
            this.error = undefined;
        })
        .catch(error =>{
            this.error = error;
            console.log('dd'+error);
            this.isLoggedIn = false;
        });

        
        
    }

    openModal() {
        this.isModalOpen = true;
    }
    closeModal() {
        this.isModalOpen = false;
    }
    submitDetails() {
        this.isModalOpen = false;
    }

    get acceptedFormats() {
        return ['.pdf','.docx', '.png','.jpg','.jpeg'];
    }
    
    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        let uploadedFileNames = '';
        for(let i = 0; i < uploadedFiles.length; i++) {
            uploadedFileNames += uploadedFiles[i].name + ', ';
        }
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: uploadedFiles.length + ' Files uploaded Successfully: ' + uploadedFileNames,
                variant: 'success',
            }),
        );
    }
}