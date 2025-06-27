namespace DeviceMonitoring.Server.Models
{
    public class DeviceSession
    {
        public Guid Id { get; set; }
        public Guid DeviceId { get; set; }
        public Device Device { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string Version { get; set; }
    }
}
