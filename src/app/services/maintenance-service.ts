import { Injectable } from '@angular/core';
import {GqlService} from './gql-service';
import {MAINTENANCE, TOGGLE_MAINTENANCE} from '../objects/gql';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  isUnderMaintenance = false;
  constructor(
    private gqlService: GqlService
  ) {

  }
  getMaintenance() {
    console.log(environment.environ)
    return this.gqlService.gqlQuery(
      MAINTENANCE,
      false,
      '',
      (response) => {
        this.isUnderMaintenance = response.maintenance.maintenance;
      }
    )
  }
  toggleMaintenance(toggle: boolean) {
    const gqlInput = {
      maintenance: toggle
    };
    return this.gqlService.gqlMutation(
      TOGGLE_MAINTENANCE,
      true,
      { gqlInput },
      'Updated Maintenance',
      (response) => {
        this.isUnderMaintenance = response.toggleMaintenance.maintenance;
      }
    );
  }
  getIsUnderMaintenance() {
    return this.isUnderMaintenance;
  }
}
