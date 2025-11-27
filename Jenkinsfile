pipeline {
    agent {
        kubernetes {
            // This YAML defines the Pod that Jenkins creates to run your build
            yaml '''
            apiVersion: v1
            kind: Pod
            metadata:
              labels:
                some-label: jenkins-docker-agent
            spec:
              containers:
              - name: docker-client
                image: docker:latest   # This image has the docker CLI installed
                command: ['cat']
                tty: true
                securityContext:
                  runAsUser: 0         # Runs as root to avoid "permission denied" on the socket
                volumeMounts:
                - name: docker-socket
                  mountPath: /var/run/docker.sock
              volumes:
              - name: docker-socket
                hostPath:
                  path: /var/run/docker.sock   # Connects to the NODE'S actual Docker Daemon
                  type: Socket
            '''
        }
    }
    stages {
        stage('Check Docker') {
            steps {
                // We execute steps INSIDE the container named 'docker-client' defined above
                container('docker-client') {
                    sh 'docker --version'
                    sh 'docker ps'
                }
            }
        }
        
        stage('Build Image') {
            steps {
                container('docker-client') {
                    // Example of building your node-demo app
                    sh 'docker build -t my-node-app:latest .'
                }
            }
        }
    }
}
