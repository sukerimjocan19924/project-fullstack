package picstory.backend.controller;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import picstory.backend.service.PostService;
import picstory.backend.web.dto.CreatePostRequest;
import picstory.backend.web.dto.PostResponse;
import picstory.backend.web.dto.UpdatePostRequest;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    // 게시글 생성
    @PostMapping
    public PostResponse create(@RequestBody CreatePostRequest request, HttpSession session) {
        return postService.create(request, session);
    }

    // 내가 작성한 게시글 전체 조회
    @GetMapping
    public List<PostResponse> findAll(HttpSession session) {
        return postService.findMyPosts(session);
    }

    @GetMapping("/{id}")
    public PostResponse findById(
            @PathVariable Long id,
            HttpSession session
    ) {
        return postService.findById(id, session);
    }

    // 게시글 수정
    @PatchMapping("/{id}")
    public PostResponse update(
            @PathVariable Long id,
            @RequestBody UpdatePostRequest request,
            HttpSession session
    ) {
        return postService.update(id, request, session);
    }

    // 게시글 삭제
    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id,
            HttpSession session
    ) {
        postService.delete(id, session);
    }
}
