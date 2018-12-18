import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Helpers } from '../../../helpers';


@Component({
    selector: "app-quick-sidebar",
    templateUrl: "./quick-sidebar.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class QuickSidebarComponent implements OnInit {

    model: any = {};
    merchantinfo: any = {};
    
    locationinfo: any = {};
    
    notificationsettings: any = {};
    
    bankinfo: any = {};
    merchantwallet: any = {};
    

    

    constructor() {

    }
    ngOnInit() {
        // #if not set
        this.merchantinfo['location_type']='ANYWHERE';   
        this.merchantwallet['prefered_payment_method']='';
        this.notificationsettings['notification_mediums']=[];
        this.notificationsettings['time_to_sms']='0';
         // #end if not set

    }

}