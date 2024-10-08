plugins {
    id("java")
    id("checkstyle")
    id("war")
}

group = "com.serezk4"
version = "2281337itmoflex"


repositories {
    mavenCentral()
}


dependencies {
    testImplementation(platform("org.junit:junit-bom:5.10.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")

    implementation("org.projectlombok:lombok:1.18.34")
    compileOnly("org.projectlombok:lombok")

    compileOnly("jakarta.servlet:jakarta.servlet-api:6.1.0")
}

tasks.test {
    useJUnitPlatform()
}

tasks.jar {
    manifest {
        attributes(
            "Main-Class" to "com.serezk4.server.FcgiServer"
        )
    }
}

tasks.register<Jar>("deploy.sh") {
    archiveClassifier.set("all")
    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
    manifest {
        attributes(
            "Main-Class" to "com.serezk4.server.FcgiServer"
        )
    }
    from(sourceSets.main.get().output)

    dependsOn(configurations.runtimeClasspath)
    from({
        configurations.runtimeClasspath.get().filter { it.name.endsWith("jar") }.map { zipTree(it) }
    })

    doLast {
        val targetDir = file("helios-root/webapp/fcgi-bin")
        if (!targetDir.exists()) {
            targetDir.mkdirs()
        }
        val targetFile = targetDir.resolve("server.jar")
        archiveFile.get().asFile.copyTo(targetFile, overwrite = true)
    }
}

tasks.check {
    dependsOn("checkstyleMain")
    dependsOn("checkstyleTest")
}

tasks.war {
    archiveFileName.set("${project.name}.war")
}

tasks.register<Copy>("deployWar") {
    description = "Deploys the WAR file to the WildFly deployments directory."
    dependsOn(tasks.war)
    from(tasks.war.get().archiveFile)
    into("/path/to/wildfly/standalone/deployments")
}