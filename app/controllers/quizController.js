const { Quiz, Tag } = require("../models");

module.exports = {
    quiz: async (request, response, next) => {
        try {
            //.then(quiz ==> const quiz = await
            // .catch(error) ===> try {} catch(error){}

            const quiz = await Quiz.findByPk(request.params.id, {
                include: [
                    "author",
                    "tags",
                    {
                        association: "questions",
                        include: ["level", "answers"],
                    },
                ],
                order: [
                    ["questions", "level_id", "ASC"],
                    ["questions", "answers", "description", "desc"],
                ],
            });

            if (!quiz) {
                return next();
            }

            if (request.session.user) {
                response.render("play_quiz", { quiz });
            } else {
                response.render("quiz", { quiz });
            }
        } catch (error) {
            console.error(error);
        }
    },

    checkAnswers: async (request, response, next) => {
        try {
            const quiz = await Quiz.findByPk(request.params.id, {
                include: [
                    "author",
                    "tags",
                    {
                        association: "questions",
                        include: ["level", "answers"],
                    },
                ],
                order: [
                    ["questions", "level_id", "ASC"],
                    ["questions", "answers", "description", "desc"],
                ],
            });

            if (!quiz) {
                return next();
            }

            if (request.body) {
                let score = 0;
                let questionNumber = 1;
                for (const question of quiz.questions) {
                    const userAnswer = parseInt(
                        request.body[`question_${questionNumber}`],
                        10
                    );
                    let answerNumber = 1;
                    for (const answer of question.answers) {
                        if (
                            question.answer_id === answer.id &&
                            userAnswer === answerNumber
                        ) {
                            score++;
                        }
                        answerNumber++;
                    }
                    questionNumber++;
                }

                // let score = 0;
                // for (let qNb=0; qNb < quiz.questions; qNb++) {
                //     const userAnswer = parseInt(request.body[`question_${i++}`], 10);
                //     for (let qAw=0; qAw < quiz.questions[qNb].answers; qAw++) {
                //         if(quiz.questions[qNb].answer_id === quiz.questions[qNb].answers[qAw].id && userAnswer === answerNumber) {
                //             score++;
                //         }
                //     }
                // }

                response.render("check_quiz", {
                    quiz,
                    userAnswers: request.body,
                    score,
                });
            } else {
                throw new Error("Pas de request body");
            }
        } catch (error) {
            console.error(error);
        }
    },

    addTag: async (request, response) => {
        try {
            const quiz = await Quiz.findByPk(request.params.id);
            const tags = await Tag.findAll();

            if (!quiz) {
                return next();
            }

            response.render("addTag", {
                quiz,
                tags,
            });
        } catch (error) {
            console.error(object);
        }
    },

    postAddTag: async (request, response) => {
        try {
            const quiz = await Quiz.findByPk(request.params.id);
            const tags = await Tag.findAll();

            if (!quiz) {
                return next();
            }

            if (!request.body.tagID) {
                response.render("addTag", {
                    quiz,
                    tags,
                    error: "Une erreur s'est produite",
                });
            } else {
                const tagID = parseInt(request.body.tagID, 10);
                quiz.addTag([tagID]);
                response.redirect(`/quiz/${quiz.id}`);
            }
        } catch (error) {
            console.error(object);
        }
    },
};
