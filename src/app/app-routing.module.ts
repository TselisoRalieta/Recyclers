import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'home-menu',
    loadChildren: () => import('./home-menu/home-menu.module').then( m => m.HomeMenuPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'profile-details',
    loadChildren: () => import('./profile-details/profile-details.module').then( m => m.ProfileDetailsPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'guidelines',
    loadChildren: () => import('./guidelines/guidelines.module').then( m => m.GuidelinesPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'admin-menu',
    loadChildren: () => import('./admin-menu/admin-menu.module').then( m => m.AdminMenuPageModule)
  },
  {
    path: 'tips-resources',
    loadChildren: () => import('./tips-resources/tips-resources.module').then( m => m.TipsResourcesPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then( m => m.ReportsPageModule)
  },   {
    path: 'admin-account',
    loadChildren: () => import('./admin-account/admin-account.module').then( m => m.AdminAccountPageModule)
  },
  {
    path: 'report-detail',
    loadChildren: () => import('./report-detail/report-detail.module').then( m => m.ReportDetailPageModule)
  },
  {
    path: 'create-event',
    loadChildren: () => import('./create-event/create-event.module').then( m => m.CreateEventPageModule)
  },
  {
    path: 'view-event',
    loadChildren: () => import('./view-event/view-event.module').then( m => m.ViewEventPageModule)
  },
  {
    path: 'manage-requests',
    loadChildren: () => import('./manage-requests/manage-requests.module').then( m => m.ManageRequestsPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'generate-tips',
    loadChildren: () => import('./generate-tips/generate-tips.module').then( m => m.GenerateTipsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
