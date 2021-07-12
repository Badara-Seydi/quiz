const { response } = require("express");
const { Tag } = require("../models");

module.exports = {
    tag: async (request, response, next) => {
        try {
            const tag = await Tag.findByPk(request.params.id, {
                include: {
                    association: "quizzes",
                    include: "author",
                },
            });

            if (!tag) {
                return next();
            }

            response.render("tag", { tag });
        } catch (error) {
            response
                .status(500)
                .render("tags", { tags: [], error: `Une erreur est survenue` });
        }
    },

    tagList: async (request, response) => {
        try {
            const tags = await Tag.findAll();
            response.render("tags", { tags });
        } catch (error) {
            response
                .status(500)
                .render("tags", { tags: [], error: `Une erreur est survenue` });
        }
    },

    tagListSansAsync: (request, response) => {
        Tag.findAll()
            .then((tags) => {
                response.render("tags", { tags });
            })
            .catch((error) => {
                console.error(error);
                response.status(500).render("tags", {
                    tags: {},
                    error: `Une erreur est survenue`,
                });
            });
    },

    newTag: (request, response) => {
        response.render("newTag");
    },

    postNewTag: async (request, response) => {
        try {
            if (request.body.tagName !== "") {
                const tag = await Tag.create({
                    name: request.body.tagName,
                });
                response.render("newTag", {
                    success: `Le tag ${tag.name} a été créé avec succès!`,
                });
            } else {
                response.render("newTag", {
                    error: "Veuillez entrer quelque chose",
                });
            }
        } catch (error) {
            console.error(error);
        }
    },

    modifyTag: async (request, response) => {
        try {
            const tags = await Tag.findAll();
            response.render("modifyTag", { tags });
        } catch (error) {
            console.error(error);
        }
    },

    postModifyTag: async (request, response) => {
        try {
            const tags = await Tag.findAll();
            if (request.body.tagName !== "") {
                const tag = await Tag.findByPk(request.body.tagID);
                const lastName = tag.name;
                const newTag = await tag.update({
                    name: request.body.tagName,
                });
                response.render("modifyTag", {
                    modifySuccess: `Le tag a bien été modifié en ${newTag.name}`,
                    tags
                });
            } else {
                response.render('modifyTag', {
                    modifyError: 'Veuillez entrer quelque chose',
                    tags
                })
            }
        } catch (error) {
            console.error(error);
        }
    },

    postDeleteTag: async (request, response) => {
        try {
            const tags = await Tag.findAll();
            const tag = await Tag.findByPk(request.body.tagID);
            const name = tag.name;
            tag.destroy().then(() => {
                response.render("modifyTag", {
                    deleteSuccess: `Le tag ${name} a bien été supprimé`,
                    tags
                });
            }).catch(() => {
                response.render("modifyTag", {
                    deleteError: `Le tag ${name} est associé à d'autres quizz, vous ne pouvez pas le supprimer`,
                    tags
                });
            });
        } catch (error) {
            console.error(error);
        }
    },
};
