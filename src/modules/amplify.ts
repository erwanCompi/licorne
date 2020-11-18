import Amplify from 'aws-amplify';
import { App } from 'vue';
import aws_exports from '../aws-exports';

Amplify.configure(aws_exports);

export default {
    install: (app: App) => {
        app.config.globalProperties.$amplify = Amplify
    }
}
