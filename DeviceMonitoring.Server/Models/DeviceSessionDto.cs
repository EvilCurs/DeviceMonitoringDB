﻿namespace DeviceMonitoring.Server.Models
{
    public class DeviceSessionDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string Version { get; set; }
    }
}
