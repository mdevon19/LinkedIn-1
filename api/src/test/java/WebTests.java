import com.ex.dao.HibDao;
import com.ex.models.Category;
import com.ex.models.Post;
import com.ex.models.RegisterForm;
import com.ex.models.User;
import com.ex.service.CategoryService;
import com.ex.service.PostService;
import com.ex.service.UserService;
import com.ex.web.CategoryController;
import com.ex.web.PostController;
import com.ex.web.UserController;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "/test-context.xml")
public class WebTests {

    @Autowired
    private HibDao dao;

    private UserController uc;

    private CategoryController cc;

    private PostController pc;

    @Before
    public void init(){

        UserService us = new UserService(dao);
        CategoryService cs = new CategoryService(dao);
        PostService ps = new PostService(dao);

        uc = new UserController(us);
        cc = new CategoryController(cs);
        pc = new PostController(ps);
    }

    @Test
    public void testUserController(){

        RegisterForm rf = new RegisterForm("test","abc123","Shane","Sanborn");

        Category testCat = new Category("Developer");
        testCat.setId(1);

        Post testPost = new Post();
        testPost.setDesc("test post");
        testPost.setPostCat(testCat);

        Assert.assertNotNull("there are not users", uc.getAllUsers());
        Assert.assertNotNull("there is no user", uc.getOtherUser("sanbornshane9"));
        Assert.assertNotNull("there is no user", uc.getUserByUsername("sanbornshane9"));
        Assert.assertNotNull("there user did not register", uc.getNewUser(rf));
        User testUser = dao.getExistingUser("sanbornshane9");
        Assert.assertNotNull("did not add a post", uc.addPostUser(testUser.getId(),testPost));
        Assert.assertNotNull("the user did not apply", uc.applyUser(69,"sanbornshane9"));
        Assert.assertNotNull("did not add category", uc.addCategoryUser(1, "sanbornshane9"));
        Assert.assertNotNull("did not find the user", uc.checkCreds(testUser.getUsername(),testUser.getPassword()));
        Post p = dao.getPostById(69);
        Assert.assertNotNull("did not get the applied users", uc.getAppliedFromPost(69 ));
        Assert.assertNotNull("did not delete apply", uc.deleteApply(p.getId(),testUser.getUsername()));


        Assert.assertTrue("did not delete user", uc.deleteUser("test").equals("deleted"));
    }

    @Test
    public void testPostController(){

        Assert.assertNotNull("did not get all posts", pc.getAllPosts());
        Assert.assertNotNull("did not get the post", pc.getPostById(69));
        Assert.assertNotNull("did not get posts", pc.getPostByUser(74));
        Assert.assertNotNull("did not get applied posts", pc.getPostByApplied("test3"));
        Assert.assertNotNull("did not get posts by category", pc.getPostByCategory(1));

    }

    @Test
    public void testCategoryController(){
        Assert.assertNotNull("did not get all categories", cc.getAllCategories());
        Assert.assertNotNull("did not get category", cc.getCategoryById(1));

    }

}
