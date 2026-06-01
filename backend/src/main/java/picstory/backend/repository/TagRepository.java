package picstory.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import picstory.backend.domain.Tag;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {

    Optional<Tag> findByMember_IdAndLabel(Long memberId, String label);

    List<Tag> findAllByMember_Id(Long memberId);

    List<Tag> findAllByMember_IdAndLabelIn(Long memberId, Collection<String> labels);

    Optional<Tag> findByIdAndMember_Id(Long id, Long memberId);

    @Query("SELECT DISTINCT t FROM Tag t JOIN t.posts p WHERE t.member.id = :memberId")
    List<Tag> findUsedTagsByUser(@Param("memberId") Long memberId);
}
