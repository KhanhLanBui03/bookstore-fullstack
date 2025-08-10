package khanhlandev.bookstore_backend.config;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.Type;
import khanhlandev.bookstore_backend.entity.Category;
import khanhlandev.bookstore_backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MethodRestConfig implements RepositoryRestConfigurer {
    private String url = "http://localhost:5173";
    @Autowired
    private EntityManager entityManager;
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
//        HttpMethod[] blockMethod = {
//                HttpMethod.POST,
//                HttpMethod.PATCH,
//                HttpMethod.PUT,
//                HttpMethod.DELETE
//        };
//        CORS configuration
        cors.addMapping("/**")
                .allowedOrigins(url)
                .allowedMethods("GET","POST","PUT","DELETE")
                .allowedHeaders("*");
        // expose ids
        config.exposeIdsFor(entityManager.getMetamodel().getEntities().stream().map(Type::getJavaType).toArray(Class[]::new));
//        disableHttpMethods(Category.class,config,blockMethod);
//        HttpMethod[] methodDelete={
//                HttpMethod.DELETE
//        };
//        disableHttpMethods(User.class,config,methodDelete);
    }
    private void disableHttpMethods(Class c,
                                    RepositoryRestConfiguration config,
                                    HttpMethod[] methods){
        config.getExposureConfiguration()
                .forDomainType(c)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(methods))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(methods));
    }
}
