package com.hana.manYoung.repository;

import com.hana.manYoung.model.Quiz;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class QuizRepository {
    private final SqlSessionTemplate sql;

    public Quiz getRandomQuiz() {
        return (Quiz) sql.selectList("Quiz.getRandomQuiz").get(0);
    }

    public List<Quiz> getAllQuiz() {
        return sql.selectList("Quiz.getAllQuiz");
    }
}
