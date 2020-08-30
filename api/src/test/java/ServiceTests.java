import com.ex.dao.HibDao;
import com.ex.models.Category;
import com.ex.models.Post;
import com.ex.models.User;
import com.ex.service.CategoryService;
import com.ex.service.PostService;
import com.ex.service.UserService;
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
public class ServiceTests {

    @Autowired
    private HibDao dao;

    private UserService us;

    private CategoryService cs;

    private PostService ps;

    @Before
    public void init(){
        us = new UserService(dao);
        cs = new CategoryService(dao);
        ps = new PostService(dao);
    }

    @Test
    public void testUser(){
        User testUser = new User();
        testUser.setUsername("testService");
        testUser.setPassword("abc123");
        testUser.setFirstName("tester");
        testUser.setLastName("tester");

        testUser = us.getNewUser(testUser);
        Assert.assertNotNull(us.getUser(testUser.getUsername()));

        Category testCat = new Category("Developer");
        testCat.setId(1);

        Post testPost = new Post();
        testPost.setDesc("test post");
        testPost.setPostCat(testCat);

        testUser = us.addPost(testUser.getId(),testPost);
        testUser = us.addCategory(3,testUser.getUsername());

        Assert.assertTrue("post was not added",testUser.getUserPosts().size() == 1);
        Assert.assertTrue("category was not added", testUser.getUserCats().size() == 1);

        us.deleteUser(testUser.getUsername());

        Assert.assertNull(us.getUser(testUser.getUsername()));
    }
}
