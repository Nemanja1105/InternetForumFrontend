import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { PermissionService } from '../services/PermissionsService/permission.service';
import { CustomSnackBarService } from '../services/CustomSnackBar/custom-snack-bar.service';
import { UserService } from '../services/UserService/user.service';
import { Router } from '@angular/router';
import { TokenService } from '../services/TokenService/token-service.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTooltip, NgClass, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  //role = new FormControl('Client', Validators.required);
  roleControls: any = [];
  permission = new FormControl('');
  roles = ['Client', 'Moderator', 'Admin']
  permissions: any = [];
  clientPerms: any = [];
  onBlur(control: any) {
    control.markAsTouched();
  }

  users: any = [];

  constructor(private router: Router, private jwtService: TokenService, private permissionsService: PermissionService, private snackBar: CustomSnackBarService, private userService: UserService) {
    this.permissionsService.findAll().subscribe({
      next: (data) => { this.permissions = data }, error: (error) => {
        if (error.status === 400 || error.status === 403) {
          this.jwtService.logout();
          this.router.navigate(['/login']);
        }
        else
          this.snackBar.openSnackBar(
            'Error communicating with the server',
            'close',
            false
          );
      }
    });

    this.userService.findAll().subscribe({
      next: (data) => {
        this.users = data;
        this.clientPerms = data.map((el: any) => el.permissions);
        this.roleControls = data.map((el: any) => new FormControl(el.role, [Validators.required]));
      }, error: (error) => {
        console.log(error);
        if (error.status === 400 || error.status === 403) {
          this.jwtService.logout();
          this.router.navigate(['/login']);
        }
        else
          this.snackBar.openSnackBar(
            'Error communicating with the server',
            'close',
            false
          );
      }
    })




  }




  selectPermission(index: any) {
    let clientPermissions = this.clientPerms[index];
    return this.permissions.filter((item: any) => !clientPermissions.some((tmp: any) => tmp.id == item.id));
  }

  addPerm(index: any, client: any) {
    let clientPermissions = this.clientPerms[index];
    clientPermissions.push(this.permission.value!);
    this.permission.setValue('');
    console.log(client);
    this.changePermission(client.id, clientPermissions);
  }

  deletePerm(index: any, item: any, client: any) {
    let clientPermissions = this.clientPerms[index];
    let obj = clientPermissions.filter((el: any) => el.id != item.id);
    this.clientPerms[index] = obj;
    this.changePermission(client.id, obj);
  }




  changeRole(index: any, item: any) {
    let control = this.roleControls[index];
    let obj = { role: control.value };
    this.userService.changeRole(item.id, obj).subscribe({
      next: () => {
        item.role = control.value;
        this.snackBar.openSnackBar(
          'Client role successfully changed!',
          'close',
          true
        );
      }, error: (error) => {
        if (error.status === 400 || error.status === 403) {
          this.jwtService.logout();
          this.router.navigate(['/login']);
        }
        else
          this.snackBar.openSnackBar(
            'Error communicating with the server',
            'close',
            false
          );
      }
    })

  }

  approveClient(item: any) {
    this.userService.approve(item.id).subscribe({
      next: () => {
        item.verified = true;
        this.snackBar.openSnackBar(
          'Client successfully approved!',
          'close',
          true
        );
      }, error: (error) => {
        if (error.status === 400 || error.status === 403) {
          this.jwtService.logout();
          this.router.navigate(['/login']);
        }
        this.snackBar.openSnackBar(
          'Error communicating with the server',
          'close',
          false
        );
      }
    })
  }

  changePermission(id: any, perms: any) {
    let obj = { permissions: perms.map((el: any) => el.id) };
    this.userService.changePermission(id, obj).subscribe({
      next: () => {

        this.snackBar.openSnackBar(
          'Client permissions successfully changed!',
          'close',
          true
        );
      }, error: (error) => {
        if (error.status === 400 || error.status === 403) {
          this.jwtService.logout();
          this.router.navigate(['/login']);
        }
        else
          this.snackBar.openSnackBar(
            'Error communicating with the server',
            'close',
            false
          );
      }
    })
  }

  blockUnblock(item: any) {

    this.userService.blockUnblock(item.id).subscribe({
      next: () => {
        item.status = !item.status;
        let message = item.status ? 'Client successfully unblocked!' : 'Client successfully blocked!'
        this.snackBar.openSnackBar(
          message,
          'close',
          true
        );
      }, error: (error) => {
        if (error.status === 400 || error.status === 403) {
          this.jwtService.logout();
          this.router.navigate(['/login']);
        }
        else
          this.snackBar.openSnackBar(
            'Error communicating with the server',
            'close',
            false
          );
      }
    })
  }
}
