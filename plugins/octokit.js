import Vue from "vue";
const { Octokit } = require("@octokit/rest");
const octokit = new Octokit();

Vue.prototype.$octokit = octokit;
