# Spring MVC 4

## Annotations

- @Configuration - annotation to specify class that is used to configure application context
- @EnableWebMvc - turns on configuration in conjunction with @Configuration annotation . Replaces servlet.config

### Controller Annotations

- @Controller
- @RestController
- @RequestMapping

## Container-less

It means that web app is run without deploying the war file to standalone Tomcat. The application it rather run from inside itself. It means that application is still running in a container, but this container is embedded inside application using Tomcat / Jetty.

## Getting Started

### Eclipse STS

Use Spring Starter Project , which is a flavour of Spring Boot. **Make sure to check Web** in the wizard. That's it! 

Generated project is barebones app - nothing is there (no controllers, views etc). To run it use Run As -> Spring Boot App.

By default, containerless app (embeded tomcat) does not server JSP files, so a few steps need to be done (working samples can be found here: https://github.com/spring-projects/spring-boot/tree/master/spring-boot-samples/spring-boot-sample-web-jsp )

- add dependency to jasper & jstl

  ```
  <dependency>
  	<groupId>org.apache.tomcat.embed</groupId>
  	<artifactId>tomcat-embed-jasper</artifactId>
  	<scope>provided</scope>
  </dependency>
  ```

- modify application.properties

  ```
  spring.mvc.view.prefix: /WEB-INF/jsp/
  spring.mvc.view.suffix: .jsp
  ```
  
- jsp file (welcome.jsp) inside ```/WEB-INF/jsp/```. Putting JSP files inside WEB-INF is recommended as it forces that the request will go through the application (file won't be served directly)

```
<!DOCTYPE html>
<html>
<body>
	Hello World!
</body>
</html>

```

- add controller

  ```
  @Controller
  public class WelcomeController {
  
  	@RequestMapping("/")
  	public String welcome(Map<String, Object> model) {
  		return "welcome";
  	}
  }
  ```
  
- to serve REST add @RestController:

	```
	@RestController
	public class ServiceController {
	
		@RequestMapping("/service")
		public Person getIt()
		{
			return new Person();
		}
		
	}
	```

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
- http://spring.io/guides/gs/rest-hateoas/ & https://spring.io/guides/gs/rest-service/ - REST samples
- http://spring.io/guides/gs/maven - maven basics
- http://spring.io/guides/gs/intellij-idea/ - importing projects into intellij
- http://projects.spring.io/spring-boot/
- http://spring.io/guides

# Maven

As a build tool:
- produces one artifacts (jar/war)
- help manage dependencies

Also as a project mgmt tool:
- can handle versioning 

Why use maven:
- repeatable build for all environments
- handling transitive dependencies

## Project object model - pom.xml

Configuration file that Maven looks for.

## Folder structure

Maven expects specyfic folder structure e.g. ```src/main/java``` - Maven compiles everything under this directory. Some Maven goals are:
- mvn clean
- mvn compile - produces ```target``` directory
- mvn package - produces jar file
