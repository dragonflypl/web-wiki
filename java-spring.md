# Spring MVC 4

## Container-less

It means that web app is run without deploying the war file to standalone Tomcat. The application it rather run from inside itself. It means that application is still running in a container, but this container is embedded inside application using Tomcat / Jetty.

## Getting Started

### Eclipse STS

Use Spring Starter Project , which is a flavour of Spring Boot. **Make sure to check Web** in the wizard. That's it! 

Generated project is barebones app - nothing is there (no controllers, views etc). To run it use Run As -> Spring Boot App.

To add some content, create a file under src/main/webapp (like html file).

### IntelliJ

In IntelliJ use Spring Initializr project.

## REST

Some solutions that support REST are:
- Spring MVC with Spring HATEOAS
- Jersey
- VRaptor

### Spring MVC

Spring MVC has HATEOAS support with http://projects.spring.io/spring-hateoas/ - Spring MVC Extension.

#### Spring HATEOAS

In Spring-HATEOAS you can extend your resources from the ResourceSupport class. ResourceSupport has already implemented support for adding links, so your job is to worry only about properties and what exactly to build those links from.

# Links
- http://zeroturnaround.com/rebellabs/beyond-rest-how-to-build-a-hateoas-api-in-java-with-spring-mvc-jersey-jax-rs-and-vraptor/ : comparsion of Spring MVC / Jersey / VRaptor
