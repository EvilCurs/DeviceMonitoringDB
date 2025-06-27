import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { ActivatedRoute } from '@angular/router';
import { DeviceSession } from '../../models/device-session.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-device-details',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {
  sessions: DeviceSession[] = [];
  deviceId: string | null = null;

  constructor(private deviceService: DeviceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.deviceId = this.route.snapshot.paramMap.get('id');
    if (this.deviceId) {
      this.loadSessions(this.deviceId);
    }
  }

  loadSessions(deviceId: string) {
    this.deviceService.getDeviceSessions(deviceId).subscribe({
      next: (sessions) => {
        this.sessions = sessions;
      },
      error: (err) => {
        console.error('Error fetching sessions:', err);
      }
    });
  }

  formatDuration(start: string, end: string | null | undefined): string {
    if (!end) return 'Active';

    try {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diff = endDate.getTime() - startDate.getTime();

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      return `${hours}h ${minutes}m`;
    } catch {
      return 'Invalid date';
    }
  }
}
