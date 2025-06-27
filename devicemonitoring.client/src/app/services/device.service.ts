import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../models/device.model';
import {  DeviceSession } from '../models/device-session.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private apiUrl = 'https://localhost:7272/api/device';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getDeviceSessions(deviceId: string): Observable<DeviceSession[]> {
    return this.http.get<DeviceSession[]>(`${this.apiUrl}/${deviceId}/sessions`, { headers: this.getHeaders() });
  }
}
