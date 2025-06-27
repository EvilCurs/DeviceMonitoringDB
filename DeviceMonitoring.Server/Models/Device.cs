namespace DeviceMonitoring.Server.Models
{
    public class Device
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<DeviceSession> Sessions { get; set; } = new();
    }
}
