package picstory.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import picstory.backend.domain.Member;
import picstory.backend.service.MemberService;
import picstory.backend.web.dto.MemberResponse;
import picstory.backend.web.dto.SignupRequest;
import picstory.backend.web.dto.WithdrawRequest;
import picstory.backend.web.dto.WithdrawResponse;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping
    public Long signup(@RequestBody SignupRequest request) {
        return memberService.signup(
                request.name(),
                request.email(),
                request.password(),
                request.passwordConfirm(),
                request.phone()
        );
    }

    @GetMapping
    public List<MemberResponse> list() {
        return memberService.findAll()
                .stream()
                .map(MemberResponse::from)
                .toList();
    }

    @PostMapping("/withdraw/check")
    public ResponseEntity<?> checkEmail(@RequestBody WithdrawRequest requestDto) {

        if (!"test@example.com".equals(requestDto.confirmEmail())) {
            // 이메일 불일치 → 메시지 반환
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new WithdrawResponse("이메일이 일치하지 않습니다. 다시 입력해 주세요."));
        }

        // 이메일 일치 → 메시지 없이 상태 코드만 반환
        return ResponseEntity.ok().build();
    }


    @DeleteMapping("/withdraw/confirm")
    public WithdrawResponse confirmWithdraw(@RequestBody WithdrawRequest requestDto) {

        if ("hard".equalsIgnoreCase(requestDto.mode())) {
            Member member = memberService.findByEmail(requestDto.confirmEmail())
                    .orElseThrow(() -> new RuntimeException("회원이 존재하지 않습니다."));
            memberService.hardDelete(member.getId());
            return new WithdrawResponse("계정이 삭제되었습니다.");
        } else {
            return new WithdrawResponse("탈퇴가 취소되었습니다.");
        }
    }

}
