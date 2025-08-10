package khanhlandev.bookstore_backend.service;

import khanhlandev.bookstore_backend.dao.UserRepository;
import khanhlandev.bookstore_backend.dto.UserRegisterDTO;
import khanhlandev.bookstore_backend.entity.ErrorMessage;
import khanhlandev.bookstore_backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AccountService {
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;
    public ResponseEntity<?> userRegister(UserRegisterDTO dto) {
        if (userRepository.existsByUsername(dto.getUsername())) {
            return ResponseEntity.badRequest().body(new ErrorMessage("Tên đăng nhập đã tồn tại"));
        }
        if (userRepository.existsByEmail(dto.getEmail())) {
            return ResponseEntity.badRequest().body(new ErrorMessage("Email đã tồn tại"));
        }
        //Mã hóa password
        String encryptPassword = passwordEncoder.encode(dto.getPassword());
        dto.setPassword(encryptPassword);


        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword()); // Bạn có thể mã hóa nếu muốn
        user.setSex(dto.getSex());
        user.setEmail(dto.getEmail());
        user.setAvatar(dto.getAvatar());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setActivateId(taoMaKichHoat());
        user.setActivated(false);
        // gán và gủi thông tin kích hoạt

        userRepository.save(user);
        //Gửi email cho người dùng để kích hoạt
        sendEmailActivated(user.getEmail(), user.getActivateId());
        return ResponseEntity.ok("Đăng ký thành công!");
    }
    private String taoMaKichHoat(){
        // Tạo mã ngẫu nhiên
        return UUID.randomUUID().toString();
    }

    private void sendEmailActivated(String email, String activatedId){
        String subject = "Kích hoạt tài khoản tại BookStore";
        String text = "Vui lòng sử dụng mã sau để kích hoạt tài khoản <"+email+">:<html><body><br/><h1>"+activatedId+"</h1></body></html>";
        text+="</br> Click vào đường link để kích hoạt tài khoản:";
        String url="http://localhost:5173/activate/"+email+"/"+activatedId;
        text+=("<br/> <a href="+url+">"+url+"</a>");
        emailService.sendMessage("lanbui779904@gmail.com",email,subject,text);
    }
    public ResponseEntity<?> activateAccount(String email, String activateId){
        User user = userRepository.findByEmail(email);
        if(user == null){
            return ResponseEntity.badRequest().body(new ErrorMessage("Người dùng không tồn tại"));
        }
        if(user.isActivated()){
            return ResponseEntity.badRequest().body("Tài khoản của bạn đã được kích hoạt");

        }
        if(activateId.equals(user.getActivateId())){
            user.setActivated(true);
            user.setActivateId(activateId);
            userRepository.save(user);
            return ResponseEntity.ok("Kích hoạt tài khoản thành công");
        }else {
            return ResponseEntity.badRequest().body(new ErrorMessage("Kích hoạt tài khoản thất bại"));
        }
    }

}
