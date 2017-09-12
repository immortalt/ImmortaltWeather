import { Injectable, Component, EventEmitter, Input } from '@angular/core';
import { AppConfig } from "../app/app.config";
import {
    AlertController, Alert, ToastController, NavController, LoadingController, Loading, ModalController, Modal,
    PopoverController, Popover, ActionSheetController, NavParams
} from "ionic-angular";
/*
 抽象服务，包含了基本的服务方法定义
 */
@Injectable()
export class AbstractComponent {
    showingLoading: boolean;
    constructor(protected cfg: AppConfig, protected navCtrl?: NavController,
        protected toastCtrl?: ToastController,
        protected loadingCtrl?: LoadingController,
        protected modalCtrl?: ModalController,
        protected alertCtrl?: AlertController,
        protected popCtrl?: PopoverController,
        protected actionCtrl?: ActionSheetController,
        protected navParams?: NavParams) {
    }
    /**
        * 显示确认提示框
        * @param title 标题
        * @param description 内容
        * @param callBack 回调函数
        * @param okBtnText 确认按钮文字，默认确定
        * @param cancelBtnText 取消按钮文字，默认取消
        */
    confirm(title: string, description: string,
        callBack: (res: boolean) => void, okBtnText: string = '确定',
        cancelBtnText: string = '取消'): Alert {
        let alert = this.alertCtrl.create({
            title: title,
            message: description,
            buttons: [
                {
                    text: cancelBtnText,
                    role: 'cancel',
                    handler: () => {
                        callBack(false);
                    }
                },
                {
                    text: okBtnText,
                    handler: () => {
                        callBack(true);
                    }
                }
            ],
            enableBackdropDismiss: false
        });

        alert.present();

        return alert;
    }
}
