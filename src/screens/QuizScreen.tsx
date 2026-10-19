import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { colors, spacing, radius } from "../styles/theme";
import OptionButton from "../components/OptionButton";
import { generateQuestion, Question } from "../utils/generateQuestion";

type QuizScreenProps = {
  onFinish: (score: number) => void;
};

const TOTAL_QUESTIONS = 10;
const FEEDBACK_DELAY_MS = 1200;

export default function QuizScreen({ onFinish }: QuizScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState<Question>(() => generateQuestion());
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAnswer = (option: number) => {
    if (!question || showFeedback || isTransitioning) return;

    const correctAnswer = question.correct;
    const answeredCorrectly = option === correctAnswer;

    setSelectedOption(option);
    setIsCorrect(answeredCorrectly);
    setShowFeedback(true);

    if (answeredCorrectly) {
      setScore((prev) => prev + 1);
    }

    setIsTransitioning(true);

    setTimeout(() => {
      const nextIndex = currentIndex + 1;

      if (nextIndex < TOTAL_QUESTIONS) {
        setCurrentIndex(nextIndex);
        setQuestion(generateQuestion());
        setSelectedOption(null);
        setShowFeedback(false);
        setIsCorrect(null);
        setIsTransitioning(false);
      } else {
        onFinish(answeredCorrectly ? score + 1 : score);
      }
    }, FEEDBACK_DELAY_MS);
  };

  const questionNumber = currentIndex + 1;
  const correctAnswer = question.correct;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.progressText}>
            Pregunta {questionNumber} / {TOTAL_QUESTIONS}
          </Text>
          <Text style={styles.scoreText}>Aciertos: {score}</Text>
        </View>

        <View style={styles.questionContainer}>
          <View style={styles.questionBox}>
            <Text style={styles.questionText}>
              {question.a} × {question.b} = ?
            </Text>
          </View>
        </View>

        {showFeedback && isCorrect === false && (
          <View style={styles.errorAlert}>
            <Text style={styles.errorAlertTitle}>¡Respuesta incorrecta!</Text>
            <Text style={styles.errorAlertText}>
              La respuesta correcta es{" "}
              <Text style={styles.correctValue}>{correctAnswer}</Text>
            </Text>
          </View>
        )}

        <View style={styles.optionsContainer}>
          <View style={styles.row}>
            <OptionButton
              label={question.options[0].toString()}
              onPress={() => handleAnswer(question.options[0])}
              disabled={showFeedback}
              isCorrect={showFeedback && question.options[0] === correctAnswer}
              isWrong={
                showFeedback &&
                selectedOption === question.options[0] &&
                question.options[0] !== correctAnswer
              }
              isSelected={selectedOption === question.options[0] && !showFeedback}
            />
            <OptionButton
              label={question.options[1].toString()}
              onPress={() => handleAnswer(question.options[1])}
              disabled={showFeedback}
              isCorrect={showFeedback && question.options[1] === correctAnswer}
              isWrong={
                showFeedback &&
                selectedOption === question.options[1] &&
                question.options[1] !== correctAnswer
              }
              isSelected={selectedOption === question.options[1] && !showFeedback}
            />
          </View>

          <View style={styles.row}>
            <OptionButton
              label={question.options[2].toString()}
              onPress={() => handleAnswer(question.options[2])}
              disabled={showFeedback}
              isCorrect={showFeedback && question.options[2] === correctAnswer}
              isWrong={
                showFeedback &&
                selectedOption === question.options[2] &&
                question.options[2] !== correctAnswer
              }
              isSelected={selectedOption === question.options[2] && !showFeedback}
            />
            <OptionButton
              label={question.options[3].toString()}
              onPress={() => handleAnswer(question.options[3])}
              disabled={showFeedback}
              isCorrect={showFeedback && question.options[3] === correctAnswer}
              isWrong={
                showFeedback &&
                selectedOption === question.options[3] &&
                question.options[3] !== correctAnswer
              }
              isSelected={selectedOption === question.options[3] && !showFeedback}
            />
          </View>
        </View>

        <View style={styles.footer}>
          {showFeedback && (
            <Text style={styles.feedbackHint}>
              {isCorrect ? "¡Correcto!" : "Pasando a siguiente pregunta..."}
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.sm,
  },
  progressText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: "600",
  },
  scoreText: {
    fontSize: 16,
    color: colors.textMuted,
    fontWeight: "600",
  },
  questionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing.lg,
  },
  questionBox: {
    backgroundColor: colors.questionBox,
    borderWidth: 2,
    borderColor: colors.questionBorder,
    borderRadius: radius.lg,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    minWidth: "80%",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  questionText: {
    fontSize: 48,
    fontWeight: "800",
    color: colors.text,
    textAlign: "center",
    letterSpacing: 1,
  },
  errorAlert: {
    backgroundColor: colors.dangerBg,
    borderWidth: 1.5,
    borderColor: colors.dangerBorder,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
  },
  errorAlertTitle: {
    color: "#FEE2E2",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  errorAlertText: {
    color: colors.dangerText,
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
  correctValue: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 18,
  },
  optionsContainer: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    minHeight: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xs,
  },
  feedbackHint: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
    fontWeight: "500",
  },
});
