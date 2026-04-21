package picstory.backend.web.dto;

public record WithdrawRequest(
        String confirmEmail, // 사용자가 입력한 이메일
        String mode          // "hard" 또는 "cancel"
) {

}
