pipeline {
    agent any

    environment {
        PATH = "/opt/sonar-scanner/bin:$PATH"
        SNYK_TOKEN = credentials('SNYK_AUTH_TOKEN')  // Snyk API token from Jenkins credentials
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/saurabhshende13/Microservices-k8s-Deployment-using-Jenkins-Pipeline.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    script {
                        sh '''
                        sonar-scanner \
                            -Dsonar.projectKey=python-app \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=$SONAR_HOST_URL \
                            -Dsonar.login=$SONAR_AUTH_TOKEN
                        '''
                    }
                }
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    sh '''
                    docker build -t saurabhdocker13/frontend $WORKSPACE/frontend
                    docker build -t saurabhdocker13/user-service $WORKSPACE/user-service
                    docker build -t saurabhdocker13/product-service $WORKSPACE/product-service
                    '''
                }
            }
        }

        stage('Snyk Vulnerability Scan') {
            steps {
                script {
                    sh '''
                    snyk auth $SNYK_TOKEN

                    snyk container test saurabhdocker13/frontend --file=$WORKSPACE/frontend/Dockerfile || true
                    snyk container test saurabhdocker13/user-service --file=$WORKSPACE/user-service/Dockerfile || true
                    snyk container test saurabhdocker13/product-service --file=$WORKSPACE/product-service/Dockerfile || true
                    '''
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'DOCKER_HUB_CREDS', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    script {
                        sh '''
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

                        docker push saurabhdocker13/frontend
                        docker push saurabhdocker13/user-service
                        docker push saurabhdocker13/product-service
                        '''
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'KUBECONFIG_CRED', variable: 'KUBECONFIG_FILE')]) {
                    script {
                        sh '''
                        echo "Using kubeconfig from Jenkins credentials..."
                        export KUBECONFIG=$KUBECONFIG_FILE

                        kubectl apply -f $WORKSPACE/k8s/frontend.yml
                        kubectl apply -f $WORKSPACE/k8s/user-service.yml
                        kubectl apply -f $WORKSPACE/k8s/product-service.yml
                        kubectl apply -f $WORKSPACE/k8s/ingress.yml
                        '''
                    }
                }
            }
        }
    }
}

