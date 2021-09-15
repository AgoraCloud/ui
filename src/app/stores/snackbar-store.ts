import { observable } from 'mobx';
import { OptionsObject } from 'notistack';
import { events, eventTypes } from 'app/constants';

export interface alert_i extends OptionsObject {
  message: string;
}

interface storeAlert_i extends alert_i {
  key: number;
}

export class SnackbarStore {
  @observable
  alerts: storeAlert_i[] = [];
  constructor() {
    this.initEvents();
  }

  push(alert: alert_i) {
    this.alerts.push({
      key: (new Date().getTime() + Math.random()) as any, // had to do this to get rid of annoying lint
      autoHideDuration: 6000,
      ...alert,
    });
  }

  get(): storeAlert_i[] {
    return this.alerts;
  }

  remove(alert) {
    return () => {
      this.alerts = this.alerts.filter((a) => {
        a.key != alert.key;
      });
    };
  }

  initEvents() {
    events.on(eventTypes.DEPLOYMENT_CRUD, (data) => {
      this.push({
        message: `Deployment successfully ${data}`,
        variant: 'success',
      });
    });
    events.on(eventTypes.DEPLOYMENT_ERR, (data) => {
      this.push({ message: `Deployment Failure: ${data}`, variant: 'error' });
    });
    events.on(eventTypes.PROJECT_CRUD, (data) => {
      this.push({
        message: `Project successfully ${data}`,
        variant: 'success',
      });
    });
    events.on(eventTypes.PROJECT_ERR, (data) => {
      this.push({ message: `Project Failure: ${data}`, variant: 'error' });
    });
    events.on(eventTypes.PROJECT_LANE_CRUD, (data) => {
      this.push({ message: `Lane successfully ${data}`, variant: 'success' });
    });
    events.on(eventTypes.PROJECT_LANE_ERR, (data) => {
      this.push({ message: `Lane Failure: ${data}`, variant: 'error' });
    });
    events.on(eventTypes.LANE_TASKS_CRUD, (data) => {
      this.push({ message: `Task successfully ${data}`, variant: 'success' });
    });
    events.on(eventTypes.LANE_TASKS_ERR, (data) => {
      this.push({ message: `Task Failure: ${data}`, variant: 'error' });
    });
    events.on(eventTypes.WORKSPACE_CREATED, (data) => {
      this.push({
        message: `Workspace successfully ${data}`,
        variant: 'success',
      });
    });
    events.on(eventTypes.WORKSPACE_RUD, (data) => {
      this.push({
        message: `Workspace successfully ${data}`,
        variant: 'success',
      });
    });
    events.on(eventTypes.WORKSPACE_ERR, (data) => {
      this.push({ message: `Workspace Failure: ${data}`, variant: 'error' });
    });

    events.on(eventTypes.USER_CRUD, (data) => {
      this.push({ message: `User successfully ${data}`, variant: 'success' });
    });
    events.on(eventTypes.USER_ERR, (data) => {
      this.push({ message: `User Failure: ${data}`, variant: 'error' });
    });

    events.on(eventTypes.WORKSPACE_USER_CRUD, (data) => {
      this.push({ message: `User successfully ${data}`, variant: 'success' });
    });
    events.on(eventTypes.WORKSPACE_USER_ERR, (data) => {
      this.push({ message: `User Failure: ${data}`, variant: 'error' });
    });
  }
}
