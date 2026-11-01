/* The shared lexical modules hold French A1 data under the course key "fr" with A1 lesson
   numbers. On the A2 page they must only expose A2 data, so lesson 1 of A2 never shows
   A1 lesson 1 words. Shared vocabulary entries reach A2 only through frA2Lessons. */
(() => {
  'use strict';
  for(const word of window.A1_VOCABULARY_CONTENT||[])word.frLessons=word.frA2Lessons||[];
  const foundations=window.A1LessonFoundations?.content;
  if(foundations)foundations.fr=window.FR_A2_FOUNDATIONS||{};
  const lexicon=window.A1LessonLexicon?.entries;
  if(lexicon)lexicon.fr=window.FR_A2_LEXICON||[];
  if(window.A1LessonVocabularyPlan){
    if(window.FR_A2_VOCABULARY_PLAN)window.A1LessonVocabularyPlan.fr=window.FR_A2_VOCABULARY_PLAN;
    else delete window.A1LessonVocabularyPlan.fr;
  }
})();
