import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guards';
import { RouteData } from '../navigation/models';
import { AboutUsComponent } from './about-us/about-us.component';
import { EmailPolicyComponent } from './email-policy/email-policy.component';
import { FaqsComponent } from './faqs/faqs.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ReturnPolicyComponent } from './return-policy/return-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';


const routes: Routes = [
  {
    path: 'aboutus',
    data: {
      title: 'About Us',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'CMS / About-Us',
          active: true,

        },
      ],
    } as RouteData,
    canActivate: [AuthGuard],
    component: AboutUsComponent,
  },
  {
    path: 'email-policy',
    data: {
      title: 'Email Policy',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'CMS / Email Policy',
          active: true,

        },
      ],
    } as RouteData,
    canActivate: [AuthGuard],
    component: EmailPolicyComponent,
  },
  {
    path: 'faqs',
    data: {
      title: 'FAQs',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'CMS / FAQs',
          active: true,

        },
      ],
    } as RouteData,
    canActivate: [AuthGuard],
    component: FaqsComponent,
  },  
  {
    path: 'privacy-policy',
    data: {
      title: 'Privacy Policy',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'CMS / Privacy Policy',
          active: true,

        },
      ],
    } as RouteData,
    canActivate: [AuthGuard],
    component: PrivacyPolicyComponent,
  }, 
   {
    path: 'return-policy',
    data: {
      title: 'Return Policy',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'CMS / Return Policy',
          active: true,

        },
      ],
    } as RouteData,
    canActivate: [AuthGuard],
    component: ReturnPolicyComponent,
  },
  {
    path: 'terms-of-service',
    data: {
      title: 'Terms of service',
      breadcrumbs: [
        {
          text: 'Dashboard',
          link: '/dashboard',
        },
        {
          text: 'CMS / Terms of service',
          active: true,

        },
      ],
    } as RouteData,
    canActivate: [AuthGuard],
    component: TermsOfServiceComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
