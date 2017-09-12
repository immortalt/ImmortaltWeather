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
    static isShowingMessage: boolean = false;
    messageToast;
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
    /**
    * 显示普通提示框
    * @param msg 提示内容
    * @param position 位置 AppConfig.toastParam.position 默认底部
    * @param timeout 关闭时间，默认3000
    * @param showCloseButton 是否显示关闭按钮 默认否
    * @param clostBtnText 关闭按钮文字
    */
    showMessage(msg: string, position?: string, timeout?: number, showCloseButton?: boolean, clostBtnText?: string) {
        // if ()
        if (!showCloseButton) {
            showCloseButton = false;
            if (!timeout) timeout = AppConfig.toastParam.duration;
        } else {
            if (showCloseButton)
                timeout = 0;
            else if (!timeout) timeout = AppConfig.toastParam.duration;
        }

        if (!clostBtnText) clostBtnText = AppConfig.toastParam.clostBtnText;

        if (!position) position = AppConfig.toastParam.position.middle;

        let showT = () => {
            this.messageToast = this.toastCtrl.create({
                message: msg,
                duration: timeout,
                showCloseButton: showCloseButton,
                closeButtonText: clostBtnText,
                position: position
            });
            if (!AbstractComponent.isShowingMessage) {
                AbstractComponent.isShowingMessage = true;
                this.messageToast.present().then(() => {
                    setTimeout(() => {
                        AbstractComponent.isShowingMessage = false;
                    }, AppConfig.toastParam.duration);
                });
            }
        };
        showT();
    }
}
