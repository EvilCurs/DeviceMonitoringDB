using DeviceMonitoring.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class DeviceController : ControllerBase
{
    private readonly AppDbContext _context;

    public DeviceController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("session")]
    public async Task<IActionResult> AddSession([FromBody] DeviceSessionDto dto)
    {
        var device = await _context.Devices
            .FirstOrDefaultAsync(d => d.Id == dto.Id);

        if (device == null)
        {
            device = new Device { Id = dto.Id, Name = dto.Name };
            _context.Devices.Add(device);
        }

        var session = new DeviceSession
        {
            Id = Guid.NewGuid(),
            DeviceId = dto.Id,
            StartTime = dto.StartTime,
            EndTime = dto.EndTime,
            Version = dto.Version
        };

        _context.DeviceSessions.Add(session);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetDevices()
    {
        var devices = await _context.Devices.ToListAsync();
        return Ok(devices);
    }

    [HttpGet("{deviceId}/sessions")]
    public async Task<IActionResult> GetDeviceSessions(Guid deviceId)
    {
        var sessions = await _context.DeviceSessions
            .Where(s => s.DeviceId == deviceId)
            .ToListAsync();
        return Ok(sessions);
    }
}