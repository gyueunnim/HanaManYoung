package com.hana.manYoung.service;

import com.hana.manYoung.model.Quiz;
import com.hana.manYoung.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizService {
    private final QuizRepository quizRepository;
    public Quiz getRandomQuiz() {
        return quizRepository.getRandomQuiz();
    }

    public List<Quiz> getAllQuiz() {
        return quizRepository.getAllQuiz();
    }
}
