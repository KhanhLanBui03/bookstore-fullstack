package khanhlandev.bookstore_backend.controller;

import khanhlandev.bookstore_backend.dto.UserRegisterDTO;
import khanhlandev.bookstore_backend.security.JwtResponse;
import khanhlandev.bookstore_backend.security.LoginRequest;
import khanhlandev.bookstore_backend.service.AccountService;
import khanhlandev.bookstore_backend.service.JwtService;
import khanhlandev.bookstore_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account")
@CrossOrigin(origins ="*" )
public class AccountController {
    @Autowired
    private AccountService accountService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;
    @PostMapping("/register")
    public ResponseEntity<?> userRegister(@RequestBody UserRegisterDTO userDTO) {
        return accountService.userRegister(userDTO);
    }

    @GetMapping("/activate")
    public ResponseEntity<?> activateAccount(@RequestParam String email, @RequestParam String activateId){
        ResponseEntity<?> response= accountService.activateAccount(email,activateId);
        return response;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){

        try{
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
                    );
            //Nếu xác thực thành công, tạo token JWT
            if(authentication.isAuthenticated()){
                final String jwt = jwtService.generateToken(loginRequest.getUsername());
                return ResponseEntity.ok(new JwtResponse(jwt));
            }
        }catch (AuthenticationException e){
            // Xác thực không thành công, trả về lỗi hoặc thông báo
            return ResponseEntity.badRequest().body("Tên đăng nhập hoặc mật khẩu chưa chính xác");
        }
        return ResponseEntity.badRequest().body("Xác thực không thành công");
    }
}
