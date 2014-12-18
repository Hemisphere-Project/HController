#
# (c) 2013-2014 ERASME
#
# This file is part of Raspeomix
#
# Raspeomix is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Raspeomix is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Raspeomix. If not, see <http://www.gnu.org/licenses/>.
#
# Part of this code is Copyright (C) 2010, Paul Lutus
# http://www.arachnoid.com/python/RPNCalc_program.html

""" RPN calculator implementation

.. moduleauthor:: Michel Blanc <mblanc@erasme.org
.. note:: This code is based on Paul Lutus' implementation http://www.arachnoid.com/python/RPNCalc_program.html
"""

import sys, re, readline, types
import logging
from math import *
from operator import *

class RPNCalc:

    def inverse(x):
        return 1/x

    def __init__(self):
        self.stack = []

        self.com2args = (
            ("+"   , add,        "y + x"),
            ("-"   , sub,        "y - x"),
            ("*"   , mul,        "y * x"),
            ("/"   , truediv,    "y / x"),
            ("%"   , fmod,       "y % x"),
            ("**"  , pow,       "y ** x"),
            ("hyp" , hypot, "hypot(x,y)"),
            ("&"   , and_,       "y & x", int, int),
            ("|"   , or_,        "y | x", int, int),
            ("^"   , xor,        "y ^ x", int, int),
            (">>"  , rshift,    "y >> x", int, int),
            ("<<"  , lshift,    "y << x", int, int),
            ("<"   , lt,         "y < x"),
            (">"   , gt,         "y > x"),
            ("<="  , le,        "y <= x"),
            (">="  , ge,        "y >= x"),
            ("=="  , eq,        "y == x"),
            ("!="  , ne,        "y != x"),
        )

        self.com1arg = (
            ("sin"  , sin,          "sin(x)"),
            ("cos"  , cos,          "cos(x)"),
            ("tan"  , tan,          "tan(x)"),
            ("asin" , asin,        "asin(x)"),
            ("acos" , acos,        "acos(x)"),
            ("atan" , atan,        "atan(x)"),
            ("sinh" , sinh,        "sinh(x)"),
            ("cosh" , cosh,        "cosh(x)"),
            ("tanh" , tanh,        "tanh(x)"),
            ("asinh", asinh,      "asinh(x)"),
            ("acosh", acosh,      "acosh(x)"),
            ("atanh", atanh,      "atanh(x)"),
            ("sqrt" , sqrt,        "sqrt(x)"),
            ("inv" ,  RPNCalc.inverse, "1/x"),
            ("log"  , log,          "log(x)"),
            ("log10", log10,      "log10(x)"),
            ("exp"  , exp,          "exp(x)"),
            ("ceil" , ceil,        "ceil(x)"),
            ("floor", floor,      "floor(x)"),
            ("erf"  , erf,          "erf(x)"),
            ("erfc" , erfc,        "erfc(x)"),
            ("!"    , factorial,   "x!", int),
            ("abs"  , fabs,            "|x|"),
            ("deg"  , degrees,  "degrees(x)"),
            ("rad"  , radians,  "radians(x)"),
            ("~"    , invert,     "~ x", int),
        )

        self.coms = (
            ("pi", lambda: self.stack.insert(0,pi),"Pi"),
            ("e" , lambda: self.stack.insert(0,e),"e (base of natural logarithms)"),
            ("drop" , lambda: self.stack.pop(0),"Drop x"),
            ("dup" , lambda: self.stack.insert(0,self.stack[0]),"Duplicate x"),
            ("swap" , lambda: self.stack.insert(0,self.stack.pop(1)),"Swap x <-> y"),
        )

    def found(self,s,tup):
        for item in tup:
            if(s == item[0]):
                # found the right func
                self.node = item
                return True
        return False

    def convert_items(self, tup):
        # converting from float to int if required
        if len(tup) >= 4 and tup[3] is not None:
            self.stack.insert(0,tup[3](self.stack.pop(0)))

        if (len(tup) == 5 and tup[4] is not None):
            self.stack.insert(1,tup[4](self.stack.pop(1)))

    def _dump_stack(self):
        """ dumps stack in a string and returns it

        :rtype: str
        """
        stk = ""
        for item in self.stack:
            stk += " %s" % item
        return stk

    def process(self, expression):
        spregex = re.compile("\s+")

        logging.debug("RPN expression : \"%s\"" % expression)

        for tok in spregex.split(expression):
            try:
                # parsing a number
                # let's try to stick to ints if possible
                #if (int(float(tok)) != float(tok)):
                self.stack.insert(0,float(tok))

             #   if True:
             #       self.dump_stack()
            except: # it's not a number
                logging.debug("Looking for tok %s" % tok)
                try: # look for command
                    if (self.found(tok, self.com2args)):
                        self.convert_items(self.node)
                        self.stack.insert(0,self.node[1](self.stack.pop(1),self.stack.pop(0)))
                    elif (self.found(tok, self.com1arg)):
                        self.convert_items(self.node)
                        self.stack.insert(0,self.node[1](self.stack.pop(0)))
                    elif (self.found(tok, self.coms)):
                        self.node[1]()
                    else:
                        logging.error("Formula error : token \"%s\" not found!" % tok)

                except ZeroDivisionError:
                    logging.error("Attempt to divide by zero : %s" % self._dump_stack())
                    raise ZeroDivisionError

                except:
                    logging.error("Unknown RPN error : %s when handling tok %s for stack -- %s --" %
                                  (sys.exc_info()[0],
                                  tok,
                                  self._dump_stack()))

        if len(self.stack) > 0:
            return self.stack[0]

if __name__ == "__main__": #pragma: no cover
    expr = sys.argv[1]
    a = RPNCalc().process(expr)
    print("%s => %s" % (expr, a))