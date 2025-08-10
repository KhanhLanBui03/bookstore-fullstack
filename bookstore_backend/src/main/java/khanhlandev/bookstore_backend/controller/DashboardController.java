package khanhlandev.bookstore_backend.controller;

import khanhlandev.bookstore_backend.dto.DashboardDTO;
import khanhlandev.bookstore_backend.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<DashboardDTO> getDashboardData() {
        DashboardDTO dto = dashboardService.getDashboardData();
        return ResponseEntity.ok(dto);
    }
}
