import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ScriptLoaderService } from "../_services/script-loader.service";
import { AuthenticationService } from "./_services/authentication.service";
import { AlertService } from "./_services/alert.service";
import { UserService } from "./_services/user.service";
import { AlertComponent } from "./_directives/alert.component";
import { LoginCustom } from "./_helpers/login-custom";
import { Helpers } from "../helpers";

@Component({
    selector: ".m-grid.m-grid--hor.m-grid--root.m-page",
    templateUrl: './templates/login-1.component.html',
    encapsulation: ViewEncapsulation.None
})

export class AuthComponent implements OnInit {
    model: any = {};
    merchantinfo: any = {};
    locationinfo: any = {};
    notificationsettings: any = {};
    bankinfo: any = {};
    merchantwallet: any = {};
    regform: any = {};


    loading = false;
    returnUrl: string;

    @ViewChild('alertSignin', { read: ViewContainerRef }) alertSignin: ViewContainerRef;
    @ViewChild('alertSignup', { read: ViewContainerRef }) alertSignup: ViewContainerRef;
    @ViewChild('alertForgotPass', { read: ViewContainerRef }) alertForgotPass: ViewContainerRef;

    constructor(private _router: Router,
        private _script: ScriptLoaderService,
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _authService: AuthenticationService,
        private _alertService: AlertService,
        private cfr: ComponentFactoryResolver) {
    }

    ngOnInit() {

        this.model['location_type'] = 'anywhere';
        this.merchantwallet['prefered_payment_method'] = '';
        this.notificationsettings['notification_mediums'] = ["email"];
        this.notificationsettings['time_to_sms'] = 0;
        this.notificationsettings['successful_payment_notify'] = true;
        this.notificationsettings['failed_payment_notify'] = true;


        this.regform = {
            user_info: "active",
            merchant_info: "",
            bank_payout_settings: "",
            errors: {
                user_info: [],
                merchant_info: [],
                bank_payout_settings: []
            }
        };

        this.model.currency = "ZAR";
        this.model.remember = true;

        this.model.document_path = "doc://filename.txt";
        this.model.credit_checked_date = "2018-12-14T06:12:31.015Z";

        // this.model.merchantinfo=this.merchantinfo;
        this.merchantwallet['hours'] = 0;
        this.merchantwallet['days'] = 0;
        this.model.merchant_wallet = this.merchantwallet;
        this.model.notification_settings = this.notificationsettings;
        this.model.bank_info = this.bankinfo;
        this.model['update_by_email'] = false;
        this.model['tippable'] = false;


        // get return url from route parameters or default to '/'
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
        this._router.navigate([this.returnUrl]);

        this._script.load('body', 'assets/vendors/base/vendors.bundle.js', 'assets/demo/default/base/scripts.bundle.js')
            .then(() => {
                Helpers.setLoading(false);
                LoginCustom.init();
            });
    }

    tabSwitch(activetab) {

        this.regform['user_info'] = '';
        this.regform['merchant_info'] = '';
        this.regform['bank_payout_settings'] = '';
        this.regform[activetab] = 'active';

    }
    signin() {
        this.loading = true;
        this._authService.login(this.model.email, this.model.password)
            .subscribe(
            data => {
                this._router.navigate([this.returnUrl]);
            },
            error => {
                this.showAlert('alertSignin');
                this._alertService.error(error);
                this.loading = false;
            });
    }

    signup() {
        this.loading = true;

        //remove rpassword

        this._userService.create(this.model)
            .subscribe(
            data => {
                this.showAlert('alertSignin');
                this._alertService.success('Thank you. To complete your registration please check your email.', true);
                this.loading = false;
                LoginCustom.displaySignInForm();
                this.model = {};
            },
            error => {
                this.showAlert('alertSignup');
                this._alertService.error(error);
                this.loading = false;
            });
    }

    forgotPass() {
        this.loading = true;
        this._userService.forgotPassword(this.model.email)
            .subscribe(
            data => {
                this.showAlert('alertSignin');
                this._alertService.success('Cool! Password recovery instruction has been sent to your email.', true);
                this.loading = false;
                LoginCustom.displaySignInForm();
                this.model = {};
            },
            error => {
                this.showAlert('alertForgotPass');
                this._alertService.error(error);
                this.loading = false;
            });
    }

    showAlert(target) {
        this[target].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this[target].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }
}