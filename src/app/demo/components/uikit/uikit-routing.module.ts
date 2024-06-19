import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../service/auth.guard';


@NgModule({
    imports: [RouterModule.forChild([
        { path: 'bill_generator', data: { breadcrumb: 'Button' }, loadChildren: () => import('./billGenerate/buttondemo.module').then(m => m.ButtonDemoModule) },
        { path: 'charts', data: { breadcrumb: 'Charts' }, loadChildren: () => import('./charts/chartsdemo.module').then(m => m.ChartsDemoModule) },
        { path: 'profile', data: { breadcrumb: 'File' }, loadChildren: () => import('./userProfile/filedemo.module').then(m => m.FileDemoModule)},
        { path: 'device_m', data: { breadcrumb: 'Float Label' }, loadChildren: () => import('./m_device_management/floatlabeldemo.module').then(m => m.FloatlabelDemoModule) },
        { path: 'stock_in', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./stockEntry/formlayoutdemo.module').then(m => m.FormLayoutDemoModule), canActivate: [AuthGuard] },
        { path: 'device_s', data: { breadcrumb: 'Input' }, loadChildren: () => import('./s_device_management/inputdemo.module').then(m => m.InputDemoModule) },
        // { path: 'invalidstate', data: { breadcrumb: 'Invalid State' }, loadChildren: () => import('./invalid/invalidstatedemo.module').then(m => m.InvalidStateDemoModule) },
        { path: 'mybill', data: { breadcrumb: 'List' }, loadChildren: () => import('./myBill/listdemo.module').then(m => m.ListDemoModule) , canActivate: [AuthGuard]},
        { path: 'AddDealer', data: { breadcrumb: 'Media' }, loadChildren: () => import('./AddDealer/mediademo.module').then(m => m.MediaDemoModule) },
        // { path: 'message', data: { breadcrumb: 'Message' }, loadChildren: () => import('./messages/messagesdemo.module').then(m => m.MessagesDemoModule) },
        { path: 'AddCustomer', data: { breadcrumb: 'Misc' }, loadChildren: () => import('./AddCustomer/miscdemo.module').then(m => m.MiscDemoModule) },
        // { path: 'overlay', data: { breadcrumb: 'Overlay' }, loadChildren: () => import('./overlays/overlaysdemo.module').then(m => m.OverlaysDemoModule) },
        { path: 'barcode', data: { breadcrumb: 'Panel' }, loadChildren: () => import('./panels/panelsdemo.module').then(m => m.PanelsDemoModule) },
        { path: 'org', data: { breadcrumb: 'Table' }, loadChildren: () => import('./addOrganization/tabledemo.module').then(m => m.TableDemoModule) , canActivate: [AuthGuard]},
        { path: 'report', data: { breadcrumb: 'Product' }, loadChildren: () => import('./getDeviceList/product.module').then(m => m.ProductModule) },
        { path: 'usr', data: { breadcrumb: 'Model' }, loadChildren: () => import('./addModel/model.module').then(m => m.ModelModule) , canActivate: [AuthGuard]},
        // { path: 'tree', data: { breadcrumb: 'Tree' }, loadChildren: () => import('./tree/treedemo.module').then(m => m.TreeDemoModule) },
        { path: 'menu', data: { breadcrumb: 'Menu' }, loadChildren: () => import('./menus/menus.module').then(m => m.MenusModule) , canActivate: [AuthGuard]},
        { path: '**', redirectTo: '/notfound' },
        { path: '', redirectTo: '/company', pathMatch: 'full' },
    ])],
    exports: [RouterModule]
})
export class UIkitRoutingModule { }
