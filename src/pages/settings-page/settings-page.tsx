import React, { useRef } from 'react';

import {
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonLabel,
  IonButton,
  IonList,
  IonText,
} from '@ionic/react';

import { connect } from 'react-redux';
import { putEmail, putPassword } from '../../redux/auth/auth.actions';

import Header from '../../components/header/header';
import { setAlert } from '../../redux/alerts/alert.actions';

interface Props {
  auth: {
    user: { email: string };
  };
  putEmail: (email: string) => void;
  putPassword: (oldPassword: string, password: string) => void;
  setAlert: (msg: string, alertType: string) => void;
}

const SettingsPage: React.FC<Props> = ({
  auth: {
    user: { email },
  },
  putEmail,
  putPassword,
  setAlert,
}) => {
  // const [icon, setIcon] = useState<string>(currentAccount.icon);
  const emailInputRef = useRef<HTMLIonInputElement>(null);

  const oldPasswordInputRef = useRef<HTMLIonInputElement>(null);
  const newPasswordInputRef = useRef<HTMLIonInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLIonInputElement>(null);

  const updateEmailHandler = (e: any) => {
    const email = emailInputRef.current!.value;

    if (!email) return setAlert('Email can not be empty', 'danger');

    putEmail(email!.toString());
  };

  const updatePasswordHandler = (e: any) => {
    const oldPassword = oldPasswordInputRef.current!.value!.toString();
    const password = newPasswordInputRef.current!.value!.toString();
    const confirmPassword = confirmPasswordInputRef.current!.value!.toString();

    if (!oldPassword)
      return setAlert('Old password can not be empty', 'danger');
    if (!password) return setAlert('New password can not be empty', 'danger');
    if (!confirmPassword)
      return setAlert('Please confirm new password', 'danger');
    if (password !== confirmPassword)
      return setAlert('Passwords do not match', 'danger');

    putPassword(oldPassword, password);
  };

  return (
    <IonPage>
      <Header title='Settings' menu={true} />
      <IonContent>
        <IonList>
          <IonItem>
            <IonText>Current Email: {email}</IonText>
            <IonLabel position='floating'>New Email Adress</IonLabel>
            <IonInput ref={emailInputRef} type='text' />
          </IonItem>
          <IonButton onClick={updateEmailHandler} expand='full'>
            Update Email
          </IonButton>
          <IonItem>
            <IonLabel position='floating'>Old Password</IonLabel>
            <IonInput ref={oldPasswordInputRef} type='password' />
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>New Password</IonLabel>
            <IonInput ref={newPasswordInputRef} type='password' />
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>Confirm New Password</IonLabel>
            <IonInput ref={confirmPasswordInputRef} type='password' />
          </IonItem>
          <IonButton onClick={updatePasswordHandler} expand='full'>
            Update Password
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  putEmail: (email: string) => dispatch(putEmail(email)),
  putPassword: (oldPassword: string, password: string) =>
    dispatch(putPassword(oldPassword, password)),
  setAlert: (msg: string, alertType: string) =>
    dispatch(setAlert(msg, alertType)),
});

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);