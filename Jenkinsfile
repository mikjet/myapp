pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Image and Run Tests') {
            steps {
                script {
                    // Build the Docker image
                    sh 'docker build --target build -t dataknox/jenkinsci-demo-build .'

                    // Run the test command and copy the junit.xml to the test-reports folder
                    sh '''
                        docker run --name build-container dataknox/jenkinsci-demo-build bash -c "npm run test -- --coverage --coverageDirectory=/react-app/test-coverage --reporters=default --reporters=jest-junit --watchAll=false && cp /react-app/junit.xml /react-app/test-reports/"
                    '''
                    
                    // Copy the test coverage and report files to the Jenkins workspace
                    sh 'docker cp build-container:/react-app/test-coverage /var/jenkins_home/workspace/testagain/'
                    sh 'docker cp build-container:/react-app/test-reports /var/jenkins_home/workspace/testagain/'
                                        
                    // Clean up the container
                    sh 'docker rm build-container'
                }
            }
        }
        stage('Build Final Production Image') {
            steps {
                script {
                    // Build the final Nginx production image
                    sh 'docker build -t dataknox/jenkinsci-demo .'
                }
            }
        }
        stage('Publish Test Results') {
            steps {
                // Publish the JUnit test results
                junit 'test-reports/junit.xml'
            }
        }
    }
    post {
        always {
            cleanWs() // Clean workspace after build
        }
    }
}