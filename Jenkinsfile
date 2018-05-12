#!/usr/bin/env groovy

node {

    stage('checkout') {
        checkout scm
    }

    stage('check tools') {
        sh "node -v"
        sh "npm -v",
        sh "ng -v"
    }

    stage('npm install') {
        sh "npm install"
    }

    stage('build') {
        sh "ng build"
        archiveArtifacts artifacts: '**/dist/*.*', fingerprint: true
    }
}

