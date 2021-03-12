import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsRoutingModule } from './cms-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '../app-common/app-common.module';
import { NavigationModule } from '../navigation/navigation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { EmailPolicyComponent } from './email-policy/email-policy.component';
import { ReturnPolicyComponent } from './return-policy/return-policy.component';
import { FaqsComponent } from './faqs/faqs.component';


@NgModule({
  declarations: [
    AboutUsComponent,
    TermsOfServiceComponent,
    PrivacyPolicyComponent,
    EmailPolicyComponent,
    ReturnPolicyComponent,
    FaqsComponent],
  imports: [
    CommonModule,
    CmsRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    AppCommonModule,
    NavigationModule,
    FormsModule,
    CKEditorModule
  ]
})
export class CmsModule { }
