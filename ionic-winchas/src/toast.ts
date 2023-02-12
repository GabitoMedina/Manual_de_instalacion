import { toastController } from "@ionic/core";

export async function toast(message: string, duration = 2000) {
    const toast = await toastController.create({
        message: message,
        duration: duration,
        position: 'bottom',
        animated: true,
        color: 'medium'
    });

    await toast.present();

}